var expect = require('chai').expect;
var getReceptMW = require('../../../../middleware/recept/getReceptMW');

describe('getRecept middleware ', function () {

  it('should return a recipe, without portion', function (done) {
        var req = {
            params:{
                receptid: '6'
            }
        };

        var res ={
            locals:{}
        };

        var mockReceptModel = {
            findOne: (p1,cb) => {
                expect(p1).to.be.eql({_id:'6'});
                cb(null, 'egyrecept');
            }
        };

        getReceptMW({
            ReceptModel : mockReceptModel
        })(req, res, function(err){
            expect(res.locals.recipe).to.be.eql('egyrecept');
            expect(err).to.be.eql(undefined);
            expect(res.locals.portion).to.be.equal(undefined);
            done();
        });
  });

  it('should return a recipe with portion', function (done) {
    var req = {
        params:{
            adag: '5',
            receptid: '6'
        }
    };

    var res ={
        locals:{}
    };

    var mockReceptModel = {
        findOne: (p1,cb) => {
            expect(p1).to.be.eql({_id:'6'});
            cb(undefined, 'egyrecept')
        }
    };

    getReceptMW({
        ReceptModel : mockReceptModel
    })(req, res, function(err){
        expect(res.locals.recipe).to.be.eql('egyrecept');
        expect(err).to.be.eql(undefined);
        expect(res.locals.portion).to.be.eql('5');
        expect(res.locals.portion).to.be.eql(req.params.adag);
        done();
    });
});

it('should return error when there is a db error', function (done) {
    var req = {
        params: { receptid: '6'}
    };

    var mockReceptModel = {
        findOne: (p1,cb) => {
            expect(p1).to.be.eql({_id:'6'});
            cb('hibavan', undefined)
        }
    };

    getReceptMW({
        ReceptModel : mockReceptModel
    })(req, {}, function(err){
        expect(err).to.be.eql('hibavan');
        done();
    });
});

it('should call next when recipe doesnt exist', function (done) {
    var req = {
        params:{
            adag: '5',
            receptid: '6'
        }
    };

    var res ={
        locals:{}
    };

    var mockReceptModel = {
        findOne: (p1,cb) => {
            expect(p1).to.be.eql({_id:'6'});
            cb(undefined, null)
        }
    };

    getReceptMW({
        ReceptModel : mockReceptModel
    })(req, res, function(err){
        expect(res.locals.recipe).to.be.eql();
        expect(err).to.be.eql(undefined);
        done();
    });
});
});
