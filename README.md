# Autobahn-Network-Script

This repository will contain a script for a future [Autobahn Network](https://autobahn.network) smart contract interaction.

# Setup

For a quick setup using SSH, use
``` 
    git clone git@github.com:0xIcey/Autobahn-Network-Script.git \
    cd Autobahn-Network-Script \
    echo "{PRIV_KEY: "YOUR_PRIV_KEY"}" > src/config.json
```

Alternatively, set it up using HTTPS
``` 
    git clone https://github.com/0xIcey/Autobahn-Network-Script.git \
    cd Autobahn-Network-Script \
    echo "{PRIV_KEY: "YOUR_PRIV_KEY"}" > src/config.json
```

After that, open the src folder, and add your private key to the config.json. You also need to add the contract address to te contract.json <br>

Now simply compile and run the program, using `npm run build`, and then `npm run start`.
