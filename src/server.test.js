"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const request = (0, supertest_1.default)(app_1.default);
(0, node_test_1.default)("GET /planets", async () => {
    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body).toEqual([{ name: "Mercury" }, { name: "Venus" }]);
});
