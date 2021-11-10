import React from "react";
import Typist from "react-typist";

const TypistWrapper = (_) => (
  <h1 className="display-3 font-weight-bold mb-5">
    <Typist cursor={{show: false}}  className="text-secondary p-4" >
      <span className="element text-primary m-1"> Find Your Education Provider</span>
      <Typist.Backspace   count={28} delay={2000} />
      <span className="element text-primary"> Compare University Course and Fee</span>
      <Typist.Backspace count={33} delay={2000} />
      <span className="element text-primary"> Choose the best one</span>
      <Typist.Backspace count={20} delay={1000} />
      <span className="element text-primary"> and Apply</span>
      <Typist.Backspace count={9} delay={1000} />
      <span className="element text-primary"> Plan your better career from here...</span>
    </Typist>
  </h1>
);

export default TypistWrapper;
