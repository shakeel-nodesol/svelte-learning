<script>
    const login = async () => {
        const authUrl = "https://accounts.google.com/o/oauth2/auth?client_id=241527457174-uccgra72uf7qsiji37vshqs908g67jg8.apps.googleusercontent.com&redirect_uri=http://localhost:9000/sso/callback&prompt=select_account&scope=openid+profile+email&response_type=token&state=asdf878as2fd4as5fasfdads";
        const width = 500;
        const height = 600;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);

        const authWindow = window.open(authUrl, 'GoogleLogin', `width=${width},height=${height},top=${top},left=${left}`);

        const pollTimer = window.setInterval(function() {
            try {
                if (authWindow.document.URL.indexOf("http://localhost:9000/sso/callback") !== -1) {
                    window.clearInterval(pollTimer);
                    const url = new URL(authWindow.document.URL);
                    const accessToken = url.hash.split('&')[0].split('=')[1];
                    authWindow.close();
                    console.log('Access Token:', accessToken);
                }
            } catch (e) {
                console.log(e);
            }
        }, 100);
    }
</script>


<main class="min-w-screen bg-purple-500 text-purple-700 text-xs min-h-screen flex items-center justify-center">
    <div class="grid grid-cols-6 bg-amber-200">
        <button on:click={login}>Login</button>
    </div>
</main>
