const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(
  /import \{ db, isFirebaseConfigured \} from '@\/services\/firebase';\nimport \{ collection, addDoc, serverTimestamp \} from 'firebase\/firestore';/,
  `import { supabase, isSupabaseConfigured } from '@/services/supabase';`
);

page = page.replace(
  /if \(isFirebaseConfigured && db\) \{\n\s*await addDoc\(collection\(db, 'vlyne_leads'\), \{\n\s*name: formData\.nome,\n\s*email: formData\.email,\n\s*company: formData\.empresa,\n\s*createdAt: serverTimestamp\(\),\n\s*source: 'Landing Page Institucional'\n\s*\}\);\n\s*\}/g,
  `if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('vlyne_leads').insert([{
          name: formData.nome,
          email: formData.email,
          company: formData.empresa,
          timestamp: new Date().toISOString(),
          status: 'novo',
          source: 'Landing Page Institucional'
        }]);
        if (error) throw error;
      }`
);

page = page.replace(
  /if \(isFirebaseConfigured && db\) \{\n\s*await addDoc\(collection\(db, 'vlyne_leads'\), \{\n\s*\.\.\.formData,\n\s*createdAt: serverTimestamp\(\),\n\s*source: 'Landing Page Institucional'\n\s*\}\);\n\s*\}/g,
  `if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('vlyne_leads').insert([{
          name: formData.nome,
          email: formData.email,
          company: formData.empresa,
          timestamp: new Date().toISOString(),
          status: 'novo',
          source: 'Landing Page Institucional'
        }]);
        if (error) throw error;
      }`
);

page = page.replace(/'Conexão Firebase \/ Local'/g, `'Conexão Supabase / Local'`);

fs.writeFileSync('src/app/page.tsx', page);
console.log('page.tsx patched');
