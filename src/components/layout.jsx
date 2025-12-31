
import React from "react";
import "../../src/globals.css";


export default function RootLayout({ children }) {
  return (
    <div className="font-sans antialiased bg-[#F5FAFF] min-h-screen">
      {children}
    </div>
  );
}

// Usage example in CaseStudies.jsx:
// import RootLayout from "./layout";
// ...
// export default function CaseStudiesPage() {
//   return (
//     <RootLayout>
//       {/* ...CaseStudies content... */}
//     </RootLayout>
//   );
// }
