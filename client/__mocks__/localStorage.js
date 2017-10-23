/* global window */

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
'eyJpZCI6NSwidXNlcm5hbWUiOiJqb2hhZGkxMCIsImVtYWlsIjoi' +
'am9oYWRpMTBAeWFob28uY29tIiwiZnVsbG5hbWUiOiJqaW1vaCBoYWRp' +
'IiwiaWF0IjoxNTAyOTczMDkzfQ.g97_4_2d_Pkt7aGmsRiuH8' +
'QIQiNxakgD2gv1kyl-t7c';
Object.defineProperty(window, 'localStorage', { value: { jwtToken } });
