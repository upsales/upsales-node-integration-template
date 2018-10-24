read -p "Name of integration: " name

echo "Copying files"
cd ..
cp -r upsales-node-integration-template $name
cd $name
sed -i "" "s/upsales-node-integration-template/$name/g" package.json
echo "# $name
_Short description what the integration does_

## Where is it?
_Where is it running_
_What endpoint does it listen to_
_Are there different deployments for beta/prod_
_Where are the logs_

## How to deploy?
_Any special deployment or set-up steps_

## Environment variables
_Which environment variables are there on what do they do_

## What are the different endpoints used for?
_Short description about the different endpoints, what does it listen do and why?_

## Dev environment
_How to run the integration on a dev environment_
" > README.md

echo "Initiating git"
rm -rf .git
git init

echo "Installing dependencies"
npm install

echo "Setup done! Integration available at $PWD"