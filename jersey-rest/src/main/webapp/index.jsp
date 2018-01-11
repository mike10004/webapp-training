<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="files/css/main.css">
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'services/status');
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const statusDiv = document.getElementById("status");
                        statusDiv.innerText = xhr.responseText;
                    } else {
                        console.warn("Request failed", xhr.status);
                    }
                };
                xhr.send();
            });
        </script>
    </head>
    <body>
        <h1>Welcome</h1>
        <div id="status"></div>
    </body>
</html>
