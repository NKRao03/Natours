"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const fs = __importStar(require("fs"));
const app = (0, express_1.default)();
//getting Tours data
let tours = JSON.parse(fs.readFileSync('../dev-data/data/tours-simple.json').toString());
//MIDDLEWARE
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log('Hello from the middleware! 😁');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
//HANDLERS
//Tours Handlers
const getAllTours = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        length: tours.length,
        data: { tours },
    });
    next();
};
const createTour = (req, res, next) => {
};
const getTour = (req, res, next) => { };
const deleteTour = (req, res, next) => { };
const updateTour = (req, res, next) => { };
//Users Handlers
const getAllUsers = (req, res, next) => { };
const createUser = (req, res, next) => { };
const getUser = (req, res, next) => { };
const deleteUser = (req, res, next) => { };
const updateUser = (req, res, next) => { };
//ROUTES
//Tours Route
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour);
//Users Route
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
    .route('/api/v1/users/:id')
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser);
//START SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running in Port ${port}`);
});
