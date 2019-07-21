if [ -d "./app" ]; then
    mv ./app/* ./
    rm -rf ./app
fi
npm run init
rm -rf ./driver.sh