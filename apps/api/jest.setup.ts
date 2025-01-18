jest.spyOn(console, "error").mockImplementation(() => {});
console.log(
    "Errors thrown during jest testing are supressed. Comment out the code in /jest.setup.ts to see console.error messages."
);
