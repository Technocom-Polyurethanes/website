const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add imports
if (!code.includes('framer-motion')) {
  code = code.replace(
    "import { L } from './translations';",
    "import { L } from './translations';\nimport { motion } from 'framer-motion';"
  );
}

// 2. Add ScrollReveal component
if (!code.includes('const ScrollReveal')) {
  const scrollRevealCode = `
const ScrollReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
`;
  code = code.replace('const Navbar = () => {', scrollRevealCode + '\nconst Navbar = () => {');
}

// 3. Wrap Hero section
code = code.replace(
  '<div className="lg:col-span-7">',
  '<ScrollReveal className="lg:col-span-7">'
).replace(
  /<\/div>\s*<div className="lg:col-span-5 relative">/,
  '</ScrollReveal>\n        <ScrollReveal delay={0.2} className="lg:col-span-5 relative">'
).replace(
  /<\/div>\s*<\/div>\s*<\/section>/,
  '</ScrollReveal>\n      </div>\n    </section>'
);

// 4. Wrap StatsBanner
code = code.replace(
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">',
  '<ScrollReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">'
).replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};/g,
  '</ScrollReveal>\n      </div>\n    </div>\n  );\n};'
);

// 5. Wrap About section
code = code.replace(
  '<div className="grid lg:grid-cols-2 gap-16 items-center">',
  '<div className="grid lg:grid-cols-2 gap-16 items-center">\n          <ScrollReveal>'
).replace(
  '<div>\n            <h2 className="text-deep-red',
  '</ScrollReveal>\n          <ScrollReveal delay={0.2}>\n            <h2 className="text-deep-red'
).replace(
  /<\/ul>\s*<\/div>\s*<\/div>/,
  '</ul>\n          </ScrollReveal>\n        </div>'
);

// 6. Wrap WhyUs section
code = code.replace(
  '<div className="text-center max-w-3xl mx-auto mb-16">',
  '<ScrollReveal className="text-center max-w-3xl mx-auto mb-16">'
).replace(
  /<\/p>\s*<\/div>\s*<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">/,
  '</p>\n        </ScrollReveal>\n\n        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">'
);
// In WhyUs map:
code = code.replace(
  '<div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors">',
  '<ScrollReveal key={i} delay={i * 0.1} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors">'
).replace(
  /<\/p>\s*<\/div>\s*\)\)/,
  '</p>\n            </ScrollReveal>\n          ))'
);

// 7. Wrap SystemsGrid section
code = code.replace(
  '<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">',
  '<ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">'
).replace(
  /<\/div>\s*<\/div>\s*<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">/,
  '</div>\n        </ScrollReveal>\n\n        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">'
);
// In SystemsGrid map:
code = code.replace(
  '<div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-dark-navy/5 hover:shadow-xl transition-all duration-300 flex flex-col">',
  '<ScrollReveal key={i} delay={i * 0.1} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-dark-navy/5 hover:shadow-xl transition-all duration-300 flex flex-col">'
).replace(
  /<\/p>\s*<\/div>\s*<\/div>\s*\)\)/,
  '</p>\n              </div>\n            </ScrollReveal>\n          ))'
);

// 8. Wrap Polyurea section
code = code.replace(
  '<div className="bg-dark-navy text-white rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl">',
  '<ScrollReveal className="bg-dark-navy text-white rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl">'
).replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  '</div>\n        </ScrollReveal>\n      </div>\n    </section>'
);

// 9. Wrap Facility section
code = code.replace(
  '<div className="lg:col-span-5 relative">',
  '<ScrollReveal className="lg:col-span-5 relative">'
).replace(
  /<\/div>\s*<\/div>\s*<div className="lg:col-span-7 lg:pl-10">/,
  '</div>\n          </ScrollReveal>\n          <ScrollReveal delay={0.2} className="lg:col-span-7 lg:pl-10">'
).replace(
  /<\/p>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  '</p>\n          </ScrollReveal>\n        </div>\n      </div>\n    </section>'
);

// 10. Wrap Certifications section
code = code.replace(
  '<h2 className="text-deep-red',
  '<ScrollReveal>\n        <h2 className="text-deep-red'
).replace(
  /<\/p>\s*<div className="flex flex-wrap justify-center gap-8">/,
  '</p>\n        </ScrollReveal>\n        \n        <div className="flex flex-wrap justify-center gap-8">'
);
// In Certifications map:
code = code.replace(
  '<div key={i} className="flex flex-col items-center bg-light-bg p-6 rounded-2xl border border-dark-navy/5 max-w-[320px] w-full group hover:shadow-xl transition-all">',
  '<ScrollReveal key={i} delay={i * 0.1} className="flex flex-col items-center bg-light-bg p-6 rounded-2xl border border-dark-navy/5 max-w-[320px] w-full group hover:shadow-xl transition-all">'
).replace(
  /<\/p>\s*<\/div>\s*\)\)/g,
  '</p>\n            </ScrollReveal>\n          ))'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Animations added');
