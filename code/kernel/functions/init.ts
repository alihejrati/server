async function init() {
    
    const [$sleep, $logger, $config, $guard, $Import, $callback] = await Promise.all([
        import('./sleep/sleep'),
        import('./logger/logger'),
        import('./config/config'),
        import('./guard/guard'),
        import('./Import/Import'),
        import('./callback/callback'),
    ]);

    await Promise.all([
        $logger.default(),
        $guard.default()
    ]);
}

export default init;