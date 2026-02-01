export const  normalizeMultiFormData=(body)=>{
  const result = {};
  for (const key in body) {
    const val = body[key];
    if (val === "true") result[key] = true;
    else if (val === "false") result[key] = false;
    else if (!isNaN(val) && val.trim() !== "") result[key] = Number(val);
    else result[key] = val;
  }
  return result;
}
export const parseJson = (input) => {
  try {
    if (typeof input === "string" &&( input.trim().startsWith("[") || input.trim().startsWith('{'))){
      const parsed = JSON.parse(input);
      return parsed;
    } else if (Array.isArray(input)) {
      return input;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Not a JSON:", error);
    return [];
  }
};

