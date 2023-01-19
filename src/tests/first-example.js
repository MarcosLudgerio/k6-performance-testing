import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';


export const requests = new Counter('http_reqs');
export const options = {
    stages: [
        { target: 100, duration: '1m' },
        { target: 50, duration: '1m' },
        { target: 25, duration: '1m' },
    ],
    thresholds: {
        http_reqs: ['count < 100'],
    },
};
export default function () {
    const res = http.get('http://localhost:8080/');
    sleep(1);
    check(res, {
        'status is 200': (r) => r.status === 200
    });
}
