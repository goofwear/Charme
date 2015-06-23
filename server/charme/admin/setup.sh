#!/bin/bash
echo "Not working yet..."

. ./variables.sh # include variables
. ./functions.sh # include functions

command_exists () {
    type "$1" &> /dev/null ;
}

step2() {
	echo "Installing PHP....."

	if [[ ! -z $YUM_CMD ]]; then # Is it  Fedora?
		yum install php php-cli php-pear httpd
		yum install php-devel
		yum install php-gd

	elif [[ ! -z $APT_GET_CMD ]]; then # or is it Debian?
		apt-get install apache2
		apt-get install php5-dev
		apt-get install make
		apt-get install php-pear
		apt-get install php5-curl
		apt-get install php5-gd
		apt-get install gearman
		apt-get install gearman-job-server libgearman-dev
		pecl install gearman-1.0.3
		apt-get install libzmq-dev
		pecl install zmq-beta

	fi

  if [[ ! -z $YUM_CMD ]]; then
	echo -e "Please follow the instructions on\n http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/ \n"
  elif [[ ! -z $APT_GET_CMD ]]; then
  echo -e "Please follow the instructions on http://docs.mongodb.org/ to install mongoDB on Debian."
  fi

	read -r -p "Type y if you have installed mongoDB? [y]  " response
	if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
	then
	    step3
	else
	    echo "Installation cancelled...."
	fi
}

step3() {
	if command_exists mongo ; then
		echo "MongoDB was found!"
    step4
	else
	    echo "FATAL ERROR: MongoDB not found. Please follow instructions to install on\nhttp://docs.mongodb.org/manual/installation/"

	step4
	fi
}

step4() {

  echo -e "We install MongoDB driver for PHP, Gearman and ZeroMQ now...."
  pecl install mongo

  if [[ ! -z $YUM_CMD ]]; then

  yum install gcc
  yum install zeromq-devel
  yum install libgearman-devel
  yum install gearmand
  pecl install gearman
  pecl install zmq-beta
  elif [[ ! -z $APT_GET_CMD ]]; then
  apt-get install gcc
  apt-get install gearman
  apt-get install gearman-job-server libgearman-dev
  pecl install gearman-1.0.3
  apt-get install libzmq-dev
  pecl install zmq-beta
  fi

  stepLast
}

stepLast() {
	echo -e "---------------------------"
	echo -e "Restarting Apache Server"
	service httpd restart
	sleep 1
	echo -e "---------------------------"

	echo -e "Installation nearly finished. Please add the following lines to your php.ini (CLI and APACHE!!!) now:"
	echo -e "extension=mongo.so"
	echo -e "extension=curl.so"
	echo -e "extension=gearman.so"
	echo -e "extension=zmq.so"

  echo -e "\n\n\ If your done then restart your apache/httpd server!!!"

}

step1(){
  echo -e "IMPORTANT: Please make sure you  are in superuser mode.\nWe are going to install a lot of packages now...\n "
	read -r -p "Do you want to install Charme? [y/N]  " response
	if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
	then
	    echo "Installing Charme...."
	    step2
	else
	    echo "Installation cancelled...."
	fi
}

if [[ ! -z $YUM_CMD ]]; then
	echo -e "Detected Package Manager is yum...\nProceeding to install..."
	step1 # TODO: must be step 1 in the final version!
elif [[ ! -z $APT_GET_CMD ]]; then
	echo -e "Detected Package Manager is apt-get\n...Proceeding to install..."
	step1
else
echo "FATAL ERROR: We did not find a package manager like apt or yum."
exit 1;
fi
