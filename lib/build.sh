#!/bin/sh

if [ ! -f "boost_1_63_0.tar.gz" ];
then
    wget -nv https://netix.dl.sourceforge.net/project/boost/boost/1.63.0/boost_1_63_0.tar.gz
    tar xfz boost_1_63_0.tar.gz
fi

if [ ! -f "jpegsrc.v8d.tar.gz" ];
then
   wget -nv http://www.ijg.org/files/jpegsrc.v8d.tar.gz .
   tar xfz jpegsrc.v8d.tar.gz
   cd jpeg-8d
   emconfigure ./configure
   emmake make
fi
