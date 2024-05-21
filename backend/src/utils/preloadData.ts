import { Products } from '../models/product.model'
import { promises as fs } from 'fs';
import path from 'path';

const preloadData = async () => {
  try {
    const dataPath = path.join(__dirname, 'products.json');
    const jsonData = await fs.readFile(dataPath, 'utf-8');
    const products = JSON.parse(jsonData);

    // Insertar los datos en la base de datos
    await Products.bulkCreate(products);

    console.log('Database has loaded the data succesfully');
  } catch (error) {
    console.log("Data is already inside the database");
  }
};

export default preloadData