const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.models.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concert/performer/:performer', () => {

  it('/  should return concerts by :performer', async () => {
    const res = await request(server).get('/concert/performer/John Doe')
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null
  });

});

describe('GET /concert/genre/:genre', () => {
    it('/should return concerts by genre', async() => {
        const res = await request(server).get('/concert/genre/Rock')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null
    })
})
describe('GET /concert/price/day/:day', () => {
    it('/should return concerts by day', async() => {
        const res = await request(server).get('/concert/day/1')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null
    })
})

describe('GET /concert/price/:price_min/:price_max', () => {
    it('/should return concerts by a price range', async() => {
        const res = await request(server).get('/concert/price/20/40')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null
    })
})