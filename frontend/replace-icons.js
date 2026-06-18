const fs = require('fs');
const path = require('path');

const iconMap = {
  'account_balance_wallet': 'Wallet',
  'close': 'X',
  'lock_clock': 'Clock',
  'arrow_forward': 'ArrowRight',
  'shield': 'Shield',
  'check_circle': 'CheckCircle',
  'open_in_new': 'ExternalLink',
  'grid_view': 'LayoutGrid',
  'storefront': 'Store',
  'favorite': 'Heart',
  'search': 'Search',
  'menu': 'Menu',
  'public': 'Globe',
  'chat': 'MessageSquare',
  'camera': 'Camera',
  'send': 'Send',
  'history': 'History',
  'arrow_downward': 'ArrowDown',
  'verified_user': 'ShieldCheck',
  'high_quality': 'Sparkles',
  'speed': 'Zap',
  'verified': 'BadgeCheck',
  'sort': 'ArrowUpDown',
  'hexagon': 'Hexagon',
  'cloud_upload': 'UploadCloud',
  'description': 'FileText',
  'diamond': 'Diamond',
  'add_photo_alternate': 'ImagePlus',
  'info': 'Info',
  'add': 'Plus',
  'delete': 'Trash2',
  'subject': 'AlignLeft',
  'visibility': 'Eye',
  'local_offer': 'Tag',
  'label': 'Tag',
  'sell': 'Tag',
  'auto_awesome': 'Sparkles',
  'palette': 'Palette',
  'sports_esports': 'Gamepad2',
  'photo_camera': 'Camera',
  'library_music': 'Music',
  'expand_more': 'ChevronDown',
  'share': 'Share2',
  'settings': 'Settings',
};

const filesToProcess = [
  'src/components/web3/TransactionModal.tsx',
  'src/components/shared/NFTCard.tsx',
  'src/components/shared/Navbar.tsx',
  'src/components/shared/Footer.tsx',
  'src/app/proceeds/page.tsx',
  'src/app/page.tsx',
  'src/app/my-nfts/page.tsx',
  'src/app/mint/page.tsx',
  'src/app/create-listing/page.tsx',
  'src/app/marketplace/[id]/page.tsx',
  'src/app/marketplace/page.tsx'
];

function processFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  const iconsUsed = new Set();
  
  // Replace <span className="material-symbols-outlined ...">icon_name</span>
  // This regex matches <span className="material-symbols-outlined[anything]">icon_name</span>
  // or <span ... className="... material-symbols-outlined ...">icon_name</span>
  // It handles varying attributes and spaces.
  
  const spanRegex = /<span([^>]*)className="([^"]*material-symbols-outlined[^"]*)"([^>]*)>\s*([a-z_]+)\s*<\/span>/g;
  
  content = content.replace(spanRegex, (match, before, className, after, iconName) => {
    let mapped = iconMap[iconName];
    if (!mapped) {
      console.warn(`Unmapped icon: ${iconName} in ${filePath}`);
      mapped = 'HelpCircle'; // fallback
    }
    iconsUsed.add(mapped);
    
    // remove material-symbols-outlined from className
    let newClass = className.replace('material-symbols-outlined', '').trim();
    newClass = newClass.replace(/\s+/g, ' ');
    
    // Reconstruct the tag
    let attrs = [];
    if (before.trim()) attrs.push(before.trim());
    if (newClass) attrs.push(`className="${newClass}"`);
    if (after.trim()) attrs.push(after.trim());
    
    // We remove fontVariationSettings if it was in 'after' (often style={{fontVariationSettings...}})
    const styleRegex = /\bstyle=\{\{.*?\}\}/;
    const cleanAttrs = attrs.join(' ').replace(styleRegex, '');
    
    return `<${mapped} ${cleanAttrs} />`;
  });

  // Handle <span className="material-symbols-outlined">{icon_var}</span>
  // E.g. <span className="material-symbols-outlined">{cat.icon}</span>
  const dynamicRegex = /<span([^>]*)className="([^"]*material-symbols-outlined[^"]*)"([^>]*)>\{([^}]+)\}<\/span>/g;
  content = content.replace(dynamicRegex, (match, before, className, after, varName) => {
    console.warn(`Dynamic icon found in ${filePath}: {${varName}}. Need manual fix.`);
    return match; // Leave dynamic ones for manual fix or handle specially
  });

  if (iconsUsed.size > 0) {
    const importStatement = `import { ${Array.from(iconsUsed).join(', ')} } from "lucide-react";\n`;
    // Insert import after the last import statement or at the top
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + importStatement + content.slice(endOfLine + 1);
    } else {
      content = importStatement + content;
    }
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Processed ${filePath}. Icons imported: ${Array.from(iconsUsed).join(', ')}`);
}

filesToProcess.forEach(processFile);
