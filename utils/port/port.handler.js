import dotenv from "dotenv";
dotenv.config();

export default Number(process.env.PORT) || 3000;
