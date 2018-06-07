const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes: notary-node-candidates", () => {

  describe("GET /notary-node-candidates", () => {

  it("should return a status code 200", (done) => {
      request.get(`${base}notary-node-candidates`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
      });
      done();
    });

  });

});
