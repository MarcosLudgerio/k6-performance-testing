import http from 'k6/http';
import { group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(90) < 10'],
    },
    vus: 10,
    duration: '10s',
};

export default function () {
    const BASE = "http://localhost:8080/api";
    group('get all users', function () {
        const res = http.get(BASE + "/users");
        check(res, {
            'is status 200': res.status == 200,
            'is body not empty': res.json().length == 0,
        });
    });
}
