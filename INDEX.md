# Quick reference for parameters ⚠
This is intended as a quick reference and showcase about what's the basic syntax for parameters when typing a __*#command*__, runing László (i.e tweeting [@laszlobot][1]). Check the Option-List latest updates on the [README.md] file.

[1]:https://twitter.com/laszlobot
[2]:https://#
[README.md]:../laszlo/master/README.md

__________

##1. Default Mode
If the next entry does not match the expected syntax or else if the parameter is missing, Laszlo will execute the default settings.

>Example: The *rotation* command needs an additional value to specify the angle of the transformation. If not, __#rotation__ will be executed as __#rotation 45__.

#### Constant Argument List
>__#RGB 0,0,139__ is the same as __#Red 0 #Green 0 #Blue 139__,

>__#size 50%,50%__ is the same as __#width 50% #height 50%__,

>__#duotone blue,white__ is the same as __#duotone #Blue #White__.

______________

##2. Numbers


#### Degrees

>Example: __#flip 180__ or __#rotation 15__
>Note: __180__ may be replaced by __#180degrees__, whitch is readable as a hashtag.

#### Size (in pixels)

>Example: __#width 150__ __#heigth 72__ 

#### Percentage


>Examples: Default settings are 0 to 100% __#flip 180__.

>Example: __#scale 0,200__ or __#resize #vertically 200%__ increases the height by two but keeps the width to 100%.

#### other: 

______________

##3. Colors

#### Constant Name List
Colors settings can be written as [HTML colors][3] (eg. __#Blue__), [HEX values][4] ( __#0000FF__) or ~~[RVB values][5] (__0,0,100__)~~.


##### One color example:  test

##### Two colors example:
>Example: __#blue__,white | __#blue__&white


[3]: http://www.w3schools.com/colors/colors_names.asp
[4]: http://www.w3schools.com/colors/colors_hex.asp
[5]: http://rgb.to

