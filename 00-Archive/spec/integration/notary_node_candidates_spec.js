const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

const sequelize = require("../../src/db/models/index").sequelize;
const NotaryNodeCandidate = require("../../src/db/models").NotaryNodeCandidate;

describe("routes: notary-node-candidates", () => {

  beforeEach((done) => {
    this.notarynodecandidate;
    sequelize.sync({force: true}).then((res) => {

      NotaryNodeCandidate.create({
        name: "MESHbits",
        details: "Satinder Grewal"
      })
      .then((notarynodecandidate) => {
        this.notarynodecandidate = notarynodecandidate;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });
  });

  describe("GET /notary-node-candidates", () => {

  it("should return a status code 200 and all candidates", (done) => {
      request.get(`${base}notary-node-candidates`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("MESHbits");
        expect(body).toContain("Notary Node Candidates");
        done();
      });
    });

  });

});
