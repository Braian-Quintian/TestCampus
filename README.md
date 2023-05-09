# TestCampus
echo "Seleccione la sala en la que se van a CREAR los usuario"
echo "1. Sputnik"
echo "2. Apolo"
echo "3. Artemis"
echo "4. Skylab"
echo "5. Salyut"
echo "6. Campus"
echo "7. Ikaros"
echo "8. Ulysses"

read -p "seleccione una opcion: " seleccion;
echo $seleccion

users=""
pass=""
case $seleccion in 
  1)
    users=("spukM01-" "spukM02-" "spukT01-" "spukT02-" "spukN01-") 
    pass=('SpMT1*@1@1$' 'SpMT2$0201*' 'SpTT1E01/23' 'SpTT2E@2/23' 'SpNT1TCD/23')

    ;;
  2)
    users=("apolM01-" "apolM02-" "apolT01-" "apolT02-" "apolN01-")
    pass=('ApMT1*@1@1$' 'ApMT2$0201*' 'ApTT1E01/23' 'ApTT2E@2/23' 'ApNT1TCD/23')
    
    ;;
  3)
    users=("arteM01-" "arteM02-" "arteT01-" "arteT02-" "arteN01-")
    pass=('AtMT1*@1@1$' 'AtMT2$0201*' 'AtTT1E01/23' 'AtTT2E@2/23' 'AtNT1TCD/23')
    
    ;;
  4)
    users=("skylab-")
    pass=('campus2023')
    
    ;;
  5)
    users=("salyut-")
    pass=('campus2023')
    
    ;;
  6)
    users=("campus-")
    pass=('campus2023')

    ;;
  
  7)
    users=("ikaros-")
    pass=('campus2023')

    ;;
  8)
    users=("ulysses-")
    pass=('campus2023')

    ;;

  *)
    echo "Opcion invalida"

    ;;
esac

echo "Ingrese el Numero del PC:"
read opcion
#for nombre in "SpukM01-" "SpukM02-" "SpukT01-" "SpukT02-" "SpukN01-"

for i in "${!users[@]}" 
do
    USER="${users[$i]}$opcion"
    PASSWORD="${pass[$i]}"
    sudo useradd -m $USER
    echo "indix :$i  user:$USER  pass: $PASSWORD"
    # Establece la contraseña para el usuario
    echo -e "$PASSWORD\n$PASSWORD" | sudo passwd $USER
    # Asigna al usuario los privilegios estándar
    #sudo usermod -m sudo $USER
        # Cambia el shell del usuario a bash
    sudo chsh -s /bin/bash $USER
done &&

sudo apt update && sudo apt upgrade -y &&

cd Downloads &&
sudo apt-get install gdebi -y &&
sudo apt-get install curl -y &&
sudo apt-get install htop -y &&
sudo apt-get install python3-pip -y && 
sudo add-apt-repository ppa:obsproject/obs-studio -y &&
sudo apt update && 
sudo apt install obs-studio -y &&
sudo wget -cO - 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64' > visualCode.deb &&
sudo wget -cO - 'https://download.typora.io/linux/typora_1.4.1-dev_amd64.deb' > typora.deb &&
sudo wget -cO - 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb' > google.deb &&
sudo wget 'https://download-installer.cdn.mozilla.net/pub/devedition/releases/112.0b9/linux-x86_64/es-ES/firefox-112.0b9.tar.bz2' &&
sudo wget -cO - 'https://dl.discordapp.net/apps/linux/0.0.26/discord-0.0.26.deb' > discord.deb &&
sudo gdebi google.deb &&
sudo gdebi visualCode.deb &&
sudo gdebi typora.deb &&
sudo gdebi discord.deb &&
sudo apt install git gitk -y &&
cd .. &&
lista_usuarios=$(cut -d: -f1 /etc/passwd) &&
lista_usuarios_ordenada=$(echo "$lista_usuarios" | tr ' ' '\n' | grep "$users") &&
for usuario in $lista_usuarios_ordenada
do
  sudo su $usuario -c "
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh &&
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash &&
  source ~/.bashrc &&
  nvm list-remote &&
  nvm install v18.15.0 &&
  nvm use v18.15.0 &&
  exit"
done 
cd Downloads &&
sudo cp -rp firefox-112.0b9.tar.bz2 /opt/ &&
cd /opt/ &&
sudo tar xjf firefox-112.0b9.tar.bz2 &&
sudo rm -rf firefox-112.0b9.tar.bz2 &&
sudo chown -R $USER /opt/firefox/ &&
sudo touch ~/.local/share/applications/firefox_dev.desktop &&
sudo echo -e "[Desktop Entry]\nName=Firefox Developer\nGenericName=Firefox Developer Edition\nExec=/opt/firefox/firefox %u\nTerminal=false\nIcon=/opt/firefox/browser/chrome/icons/default/default128.png\nType=Application\nCategories=Application;Network;X-Developer;\nComment=Firefox Developer Edition Web Browser.\nStartupWMClass=Firefox Developer Edition" | sudo tee ~/.local/share/applications/firefox_dev.desktop &&
sudo chmod +x ~/.local/share/applications/firefox_dev.desktop &&
cd &&

sudo apt update && sudo apt upgrade -y
