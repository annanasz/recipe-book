var expect = require('chai').expect;
var deleteReceptMW = require('../../../../middleware/recept/deleteReceptMW');

describe('deleteRecept middleware ', function () {

  it('should call next', function (done) {
    var res ={
        locals:{}
    };
    deleteReceptMW({
    })({}, res, function(err){
        expect(err).to.be.eql(undefined);
        done();
    });
 });

 it('should call next with error', function (done) {
    var res ={
        locals:{
            recipe:{
                remove: (cb) => {
                    cb('hiba');
                }
            }
        }
    };
    deleteReceptMW({
    })({}, res, function(err){
        expect(err).to.be.eql('hiba');
        done();
    });
 });

 it('should redirect to /', function (done) {
    var res ={
        locals:{
            recipe:{
                remove: (cb) => {
                    cb(null);
                }
            }
        },
        redirect: (where) => {
            expect(where).eql('/');
            done(); 
        }
    };
    deleteReceptMW({
    })({}, res, function(err){});
 });
});