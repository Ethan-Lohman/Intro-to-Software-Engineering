const router = require('./googleID.js');

test('checks for google documents ID', () => {
    var myLocation = {
        hash: "#/gdID/1HugpmF8AN9iqgwqPtE9W5i1Y1oV1ycIjtiD1SlYKwC4"
    }
    var result = router(myLocation);
    expect(result.gdID).toBe("1HugpmF8AN9iqgwqPtE9W5i1Y1oV1ycIjtiD1SlYKwC4");
});