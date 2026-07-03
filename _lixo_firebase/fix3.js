const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  "import { db, isFirebaseConfigured } from '@/services/firebase';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';",
  "import { supabase, isSupabaseConfigured } from '@/services/supabase';"
);

code = code.replace(
  "if (isFirebaseConfigured && db) {\n        await addDoc(collection(db, 'vlyne_leads'), {\n          ...formData,\n          createdAt: serverTimestamp(),\n          source: 'Landing Page Institucional'\n        });\n      }",
  "if (isSupabaseConfigured && supabase) {\n        const { error } = await supabase.from('vlyne_leads').insert([{\n          name: formData.nome,\n          email: formData.email,\n          company: formData.empresa,\n          timestamp: new Date().toISOString(),\n          status: 'novo',\n          source: 'Landing Page Institucional'\n        }]);\n        if (error) throw error;\n      }"
);

code = code.replace("'Conexão Firebase / Local'", "'Conexão Supabase / Local'");

fs.writeFileSync('src/app/page.tsx', code);
console.log("Done");
