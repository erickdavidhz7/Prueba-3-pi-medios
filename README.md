# Prueba Tres Pis Medios Backend
#Daniela Store Site

**Usuarios: 3**

- Cliente (everyone)
- Empleado (employee)
- Administrador (admin)

# API DOCUMENTATION FOR BACKEND TESTING

1. **Create an .env file with the constants declared in the env.example file**
2. **Install the dependencies with npm i**
3. **Run the server with npm run dev (development) or npm start (production)**

## APIDOCS
1. **All the respective documentation it is on the /api-docs endpoint done with swaggerui**
2. **The PORT would be a environment variable that has to be filled on the respective .env file of the project**
3. **There is an env.example file to have a reference of what environment variables are needed for the project, they can also be seen in the constants.ts file inside the utils directory**

| TYPE   | DETAIL         | ROUTE                                  |
| ------ | -------------- | -------------------------------------- | 
| GET    | DOCUMENTATION  | http://localhost:PORT/api-docs         |

# FRONT END TESTING
1. **Install the dependencies with npm i**
2. **Run the server with npm run dev (development), the admin user and password are always going to be the following:**
3. **USERNAME=ADMIN**
4. **PASSWORD=ADMIN_DANIELA_STORE_123**

# ALERT! 
# KNOWN BUGS
1. **Sometimes when running the server for the first time it doesn't preload the corresponding data of the json a seed route has been created for this reason besides using the seed route the best solution is just restarting the server**
2. **sometimes seed has to be used multiple times**
3. **seed route is:**
   
| TYPE   | DETAIL         | ROUTE                                  |
| ------ | -------------- | -------------------------------------- | 
| GET    | SEED           | http://localhost:PORT/seed             |
