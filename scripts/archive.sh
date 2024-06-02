#!/bin/sh

[ -e archive/*.zip ] && rm archive/*.zip
[ ! -d archive ] && mkdir archive
pnpm run build
zip -r archive/bookmark-filer.zip dist
