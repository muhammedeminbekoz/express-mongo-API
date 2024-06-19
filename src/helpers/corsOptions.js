const whiteList = ["http://localhost:1903", "http://localhost:3000"]

const corsOptions = (req, callback) => {
    let corsOptions;
    //console.log('All headers:', req.headers);  // Log all headers
    //console.log(req.headers.host)
    const origin = req.header("Origin");
    //console.log('Origin:', origin);  // Log the Origin header

    if (whiteList.indexOf(origin) !== -1) {
        //    console.log("Origin allowed");
        corsOptions = { origin: true };
    } else {
        //    console.log("Origin not allowed");
        corsOptions = { origin: false };
    }

    callback(null, corsOptions);
};


module.exports = corsOptions