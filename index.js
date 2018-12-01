const cloud = require("@pulumi/cloud-aws");
const aws = require("@pulumi/aws");

let service = new cloud.Service("pulumi-nginx", {
    containers: {
        nginx: {
            build: "./app",
            memory: 128,
            ports: [{ port: 80 }],
        },
    },
    replicas: 2,
});

exports.url = service.defaultEndpoint.apply(e => `http://${e.hostname}`);