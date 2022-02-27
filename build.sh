BUILD_PATH=out

if [ ! -d $BUILD_PATH ]; then
    mkdir $BUILD_PATH
fi

if [ -f $BUILD_PATH/table_export.zip ]; then
    rm $BUILD_PATH/table_export.zip
fi

zip -r $BUILD_PATH/table_export.zip * -x .gitignore "$BUILD_PATH/*" "test/*" build.sh README.md