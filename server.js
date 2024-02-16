import app from "./src/app.js"
import swaggerUI from 'swagger-ui-express'; 
import swaggerJsDoc from 'swagger-jsdoc';  
import swaggerOptions from './src/docs/config/head.js'; 


const port = process.env.PORT || 3010;

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerOptions)));



app.listen(port, () => {
    console.log(`Servidor Rodando em http://localhost:${port}`)
});
