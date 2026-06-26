const fs = require('fs');
let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(
  "import { db, isFirebaseConfigured } from '@/services/firebase';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';",
  "import { supabase, isSupabaseConfigured } from '@/services/supabase';"
);

page = page.replace(
  "if (isFirebaseConfigured && db) {\n        await addDoc(collection(db, 'vlyne_leads'), {\n          ...formData,\n          createdAt: serverTimestamp(),\n          source: 'Landing Page Institucional'\n        });\n      }",
  "if (isSupabaseConfigured && supabase) {\n        const { error } = await supabase.from('vlyne_leads').insert([{\n          name: formData.nome,\n          email: formData.email,\n          company: formData.empresa,\n          timestamp: new Date().toISOString(),\n          status: 'novo',\n          source: 'Landing Page Institucional'\n        }]);\n        if (error) throw error;\n      }"
);

page = page.replace(/'Conexão Firebase \/ Local'/g, "'Conexão Supabase / Local'");

fs.writeFileSync('src/app/page.tsx', page);
console.log('Done!');
