import Client from '../src/DriverClient.js';

describe('DriverClient.construct()', () => {
    it('should create a client with default options', () => {
        const client = new Client();

        client.constructor.name.should.equal('DriverClient');
        should.exist(client.client);
        client.client.constructor.name.should.equal('GremlinClient');

        client.client.port.should.equal(8182);
        client.client.host.should.equal('localhost');
    });

    it('should allow setting the `port` option', () => {
        const client = new Client("localhost", 8183);
        client.client.port.should.equal(8183);
    });

    it('should allow setting the `host` option', () => {
        const client = new Client("otherhost", 8182);
        client.client.host.should.equal('otherhost');
    });

    it('should allow setting the driver options', () => {
        const client = new Client("localhost", 8182, {op:'test'});
        client.client.options.op.should.equal('test');
    });
});


describe('DriverClient.buildResult()', () => {

    it('should create and populate a Result object', () => {
        const client = new Client();
        const result = client.buildResult("raw error", "results");

        result.constructor.name.should.equal('Result');
        result._rawResults.should.equal('results');
        result._rawError.should.equal('raw error');

    });

    it('should accept a Result object generated from undefined vars', () => {
        const client = new Client();
        const result = client.buildResult(undefined, undefined);

        result.constructor.name.should.equal('Result');
    });
});

describe('DriverClient.execute()', () => {

    it('should execute correctly with: query', () => {
        const client = new Client();
        client.execute("5+5");
    });

    it('should execute correctly with: query + bindings', () => {
        const client = new Client();
        client.execute("5+variable", {variable:5});
    });

    it('should execute correctly with: query + callback', () => {
        const client = new Client();
        client.execute("5+5", () => {});
    });

    it('should execute correctly with: query + bindings + callback', () => {
        const client = new Client();
        client.execute("5+variable", {variable:5}, () => {});
    });

    //~ it('callback should receive query + Result object', () => {
        //~ const client = new Client();
        //~ client.execute("5+5", (query, result) => {
            //~ console.log(query);console.log(result);
            //~ query.should.be.a('string');
            //~ result.constructor.name.should.equal('Result');
        //~ });
    //~ });
//~
    //~ it('output query and Result object should contain the correct information', () => {
        //~ const client = new Client();
        //~ let query, result;
//~
        //~ async client.execute("5+5", (q, r) => {
            //~
        //~ });
//~
    //~ });
});
