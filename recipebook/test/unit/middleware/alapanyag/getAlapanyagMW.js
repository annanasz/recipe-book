var expect = require('chai').expect;
var getAlapanyagMW = require('../../../../middleware/alapanyag/getAlapanyagMW');

describe('getAlapanyag middleware ', function () {

  it('should return an alapanyag', function (done) {
        var req = {
            params:{
                alapanyagid: '3'
            }
        };

        var res ={
            locals:{}
        };

        var mockAlapanyagModel = {
            findOne: (p,cb) => {
                expect(p).to.be.eql({_id:'3'});
                cb(null, 'alapanyaaag');
            }
        };

        getAlapanyagMW({
            AlapanyagModel : mockAlapanyagModel
        })(req, res, function(err){
            expect(res.locals.ingredient).to.be.eql('alapanyaaag');
            expect(err).to.be.eql(undefined);
            done();
        });
  });


it('should return error when there is a db error', function (done) {
    var req = {
        params:{
            alapanyagid: '3'
        }
    };

    var mockAlapanyagModel = {
        findOne: (p,cb) => {
            expect(p).to.be.eql({_id:'3'});
            cb('hibavaan', undefined);
        }
    };

    getAlapanyagMW({
        AlapanyagModel : mockAlapanyagModel
    })(req, {}, function(err){
        expect(err).to.be.eql('hibavaan');
        done();
    });
});

it('should call next when alapanyag doesnt exist', function (done) {
    var req = {
        params:{
            alapanyagid: '3'
        }
    };

    var res ={
        locals:{}
    };

    var mockAlapanyagModel = {
        findOne: (p,cb) => {
            expect(p).to.be.eql({_id:'3'});
            cb(null, null);
        }
    };

    getAlapanyagMW({
        AlapanyagModel : mockAlapanyagModel
    })(req, {}, function(err){
        expect(res.locals.recipe).to.be.eql();
        expect(err).to.be.eql(undefined);
        done();
    });
});
});
