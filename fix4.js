const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Use regex with \s* to ignore newlines and carriage returns
code = code.replace(
  /import\s*\{\s*db,\s*isFirebaseConfigured\s*\}\s*from\s*'@\/services\/firebase';\s*import\s*\{\s*collection,\s*addDoc,\s*serverTimestamp\s*\}\s*from\s*'firebase\/firestore';/,
  "import { supabase, isSupabaseConfigured } from '@/services/supabase';"
);

code = code.replace(
  /if\s*\(\s*isFirebaseConfigured\s*&&\s*db\s*\)\s*\{\s*await\s*addDoc\(\s*collection\(\s*db,\s*'vlyne_leads'\s*\),\s*\{\s*\.\.\.formData,\s*createdAt:\s*serverTimestamp\(\),\s*source:\s*'Landing\s*Page\s*Institucional'\s*\}\);\s*\}/,
  "if (isSupabaseConfigured && supabase) {\n        const { error } = await supabase.from('vlyne_leads').insert([{\n          name: formData.nome,\n          email: formData.email,\n          company: formData.empresa,\n          timestamp: new Date().toISOString(),\n          status: 'novo',\n          source: 'Landing Page Institucional'\n        }]);\n        if (error) throw error;\n      }"
);

code = code.replace(/Conexão\s*Firebase\s*\/\s*Local/g, "Conexão Supabase / Local");

fs.writeFileSync('src/app/page.tsx', code);
console.log("Done");
