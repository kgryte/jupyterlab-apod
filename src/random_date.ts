export function randomDate(): string {
	const start = ( new Date( 2010, 1, 1 ) ).getTime();
	const end = ( new Date() ).getTime();
	const d = new Date( start + (Math.random()*(end-start)) );
	return d.toISOString().slice( 0, 10 );
}