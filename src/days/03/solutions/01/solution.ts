import { always, pipe, tap } from 'rambda';

export default pipe(tap(console.log), always(6));
