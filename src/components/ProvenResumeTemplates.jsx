import React from "react";

function ProvenResumeTemplates() {
  return (
    <div className="bg-[#5f27c7] h-[50vh] flex flex-col items-center justify-center text-white p-8">
      {/* Icon */}
      <img
        src="../public/target.png"
        alt="Bullseye Icon"
        className="w-12 h-12 mb-4"
      />

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-2 text-center">Proven resume <br/> templates</h1>

      {/* Subtext */}
      <p className="text-lg text-center leading-relaxed max-w-md text-slate-400">
        These resume templates are here because they work.
        <br />
        Every one is tried and tested on real hiring managers.
      </p>
    </div>
  );
}

export default ProvenResumeTemplates;
