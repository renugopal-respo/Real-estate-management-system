import bcrypt from 'bcrypt';

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  console.log("password hash is working");
  return hashed;
};

const isPasswordValid=async(storedHash,enteredPassword)=>{
    const isPasswordValid = await bcrypt.compare(enteredPassword, storedHash);
    console.log("password comaprison is working");
if (isPasswordValid) {
  return true;
} else {
  return false;
}
}

 export  {hashPassword,isPasswordValid};