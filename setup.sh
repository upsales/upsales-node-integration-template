read -p "Name of integration: " name

echo "Copying files"
cd ..
cp -r upsales-node-integration-template $name
cd $name
sed -i "" "s/upsales-node-integration-template/$name/g" package.json
echo "# $name" > README.md

echo "Initiating git"
rm -rf .git
git init

echo "Installing dependencies"
npm install

echo "Setup done! Integration available at $PWD"