const mongoose = require('mongoose');
const mainSchema = require("../schemas/mainSchema");
const datas = require("./schemaData");

main()
.then(()=>console.log("Mongosh ok !"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const dataInsert = async () => {
  try {
    await mainSchema.deleteMany({});
    const modifiedData = datas.data.map(obj => ({
      ...obj,
      owner: '681473c70126e5396a409eb6'
    }));
    await mainSchema.insertMany(modifiedData);
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error during data insertion:", error);
  }
};

dataInsert();