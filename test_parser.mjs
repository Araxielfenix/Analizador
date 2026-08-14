import { parseIsoFull } from './src/analizarIso.js';

const reqMsg = `[T: 11:16:06.764][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I0 ][Rw: W][L:  662]ISO02500007702003238C48128A1801E003000000000030000071417160690574511153907140714539901000111003456790121554629******2353=****0016313461050000000000124033UNPSP                 DF           MEXMX0278946354            00010001484016P387CPAY+0000000019EGLO000000000000000010          379& 0000800379! Q100002 90! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! CE00202 01kBNnCDvCPMtJmT9q/V+Tr0hB4oJ0                                                                                                                                                                            ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66`;

const respMsg = `[T: 11:16:06.874][D: 11044][C:    554629******2353][Iap: iap_BBVEMI-M2-05    ][Lp: 0:I8 ][Rw: R][L:  388]ISO0250000750210323A84012E90800A0030000000000300000714111606905745111539071407140714010111003456790121554629******2353=****00163134610500000049000000000012403302 0484019EGLO000003000000000197& 0000800197! Q100002 00! Q200002 09! C000026 **** 001          5  1 2 2! C400012 102510023660! R700013              ! RJ00040 2 ae37f673-cd20-4e7c-b244-e792df5e2b66  ! 0400020 C           E     N`;

console.log('=== TEST SOLICITUD (0200) ===');
const resReq = parseIsoFull(reqMsg);
console.log('Header:', resReq.header);
console.log('MTI:', resReq.mti, '-', resReq.mtiDescripcion);
console.log('Resumen:', resReq.summary);
console.log('Tokens F63 IDs:', Object.keys(resReq.field63Parsed));
console.log('Token RJ:', resReq.field63Parsed.RJ);

console.log('\n=== TEST RESPUESTA (0210) ===');
const resResp = parseIsoFull(respMsg);
console.log('Header:', resResp.header);
console.log('MTI:', resResp.mti, '-', resResp.mtiDescripcion);
console.log('Resumen:', resResp.summary);
console.log('Tokens F63 IDs:', Object.keys(resResp.field63Parsed));
console.log('Token RJ:', resResp.field63Parsed.RJ);