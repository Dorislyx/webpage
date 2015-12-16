/*********************************************************************************/
var SETUP_ModuleAmount = 5; //功能模块总数量(从0开始计数)                        //
var SETUP_Language = 'english'; //设置界面语言, 取值: 'chinese', 'english'       //
var SETUP_SkinIndex = 0; //设置默认皮肤颜色                                      // 
var SETUP_SkinTotal = 2; //设置皮肤颜色数量                                      //
var SETUP_WebStyle = 0; //设置界面风格，取值：0或1                               //
/*********************************************************************************/

/*********************************************************************/
/* Function: comm_LanguageSelect                                     */
/* Description: 公共函数的中英文切换                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-17                                 */
/*********************************************************************/
var common_USB_INFO; //移动设备信息
function comm_LanguageSelect()
{
	if (SETUP_Language=='english') {
		common_USB_INFO = new Array('Find mobile devices', 'Devices is available', 'Devices is removed');
	}
	else {
		common_USB_INFO = new Array('发现移动设备', '移动设备可用', '移动设备已移除');
	}
	return;
}

/*********************************************************************/
/* Function: menu_LanguageSelect                                     */
/* Description: 主菜单的中英文切换                                   */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-17                                 */
/*********************************************************************/
var menu_MODULE_STRING; //功能模块文字数组
function menu_LanguageSelect()
{
	if (SETUP_Language=='english') {
		menu_MODULE_STRING = new Array('MOVIE', 'MUSIC', 'ALBUM', 'GAME', 'MANAGE', 'SETTINGS');
		menu_MODULE_STRING_STYLE = new Array('MOVIE', 'MUSIC', 'ALBUM', 'GAME', 'MANAGE', 'SETTINGS');
	}
	else {
		menu_MODULE_STRING = new Array('电影MOVIE', '音乐MUSIC', '相册ALBUM', '游戏GAME', '管理MANAGE', '设置SETTINGS');
		menu_MODULE_STRING_STYLE = new Array('电影', '音乐', '相册', '游戏', '文件管理', '系统设置');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: disk_LanguageSelect                                     */
/* Description: 分区选择界面的中英文切换                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-18                                 */
/*********************************************************************/
var disk_DEVICE_NAME; //功能模块文字数组
var disk_DEVICE_NONE; //无可用设备文字
var disk_PAGE_NUMBER; //页码文字数组
var disk_DISK_SPACE; //硬盘空间文字数组
var disk_DISK_INFO; //硬盘信息文字数组
var disk_DISK_TYPE; //硬盘类型文字数组
function disk_LanguageSelect()
{
	if (SETUP_Language=='english') {
		disk_DEVICE_NAME = new Array('Local Disk', 'USB1', 'USB2', 'SERVER');
		disk_DEVICE_NONE = 'No device is available,<br>Press [Back] key to exit.';
		disk_PAGE_NUMBER = new Array('Page ', ' of ', '');
		disk_DISK_SPACE = new Array('Disk ', 'Free ');
		disk_DISK_INFO = new Array('Type: ', 'Name: ', 'Symbol: ', 'Capacity: ', 'Free: ', 'Used: ', 'Label: ');
		disk_DISK_TYPE = new Array('Local disk', 'Mobile devices', 'Server');
	}
	else {
		disk_DEVICE_NAME = new Array('本机硬盘', 'USB1', 'USB2', '服务器');
		disk_DEVICE_NONE = '无可用存储设备，<br>按[返回]键退出！';
		disk_PAGE_NUMBER = new Array('第', '/', '页');
		disk_DISK_SPACE = new Array('硬盘', '可用');
		disk_DISK_INFO = new Array('设备类型：', '设备名称：', '分区标识：', '分区空间：', '可用空间：', '已用空间：', '分区卷标：');
		disk_DISK_TYPE = new Array('本机硬盘', '移动存储设备', '网络服务器');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: movie_LanguageSelect                                    */
/* Description: 电影界面的中英文切换                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-21                                 */
/*********************************************************************/
var movie_FILE_ERROR; //硬盘信息文字数组
var movie_PAGE_NUMBER; //页码文字数组
var movie_FILE_INFO; //文件信息数组
var movie_BOOK_MARK; //书签信息数组
var movie_OPERATE; //操作提示信息数组
var movie_VOLUME; //音量信息数组
var movie_STREAM; //码流信息数组
var movie_AUDIO_CHANNEL;	//声道信息数组
function movie_LanguageSelect()
{
	if (SETUP_Language=='english') {
		movie_FILE_ERROR = new Array('<br>File format is not supported!', '<br>Audio is not supported!', '<br>Video is not supported!', '<br>Audio and Video are not supported!', '<br>Press [Back] key to exit.', '<br>Press [Back] key to exit, <br>Press [Enter] key to continue.', '<br>No folder or file is available!');
		movie_PAGE_NUMBER = new Array('Page ', ' of ', '');
		movie_FILE_INFO = new Array('Type: ', 'Size: ', 'Date: ', 'Time: ', 'Name: ');
		movie_BOOK_MARK = new Array('<br>Bookmark has been set at ', '<br>Whether to play the bookmark?', 'Unable to get data source!', '<br>Current time is ', '<br>Whether to set the bookmark?', '<br>No Bookmark!');
		movie_OPERATE = new Array('Invalid Operation', 'Chapter: ', 'Audio Track: ', 'Subtitle: ', ' of ', '&nbsp;&nbsp;&nbsp;', 'Format: ', '&nbsp;&nbsp;&nbsp;Language: ', 'Video System: ', 'No', 'Unknown');
		movie_VOLUME = new Array('Volume: ', '&nbsp;&nbsp;&nbsp;Mute: On', '&nbsp;&nbsp;&nbsp;Mute: Off');
		movie_STREAM = new Array('File Type: ', '&nbsp;&nbsp;&nbsp;File Size: ', 'Current Time: ', '&nbsp;&nbsp;&nbsp;Total Time: ', 'File Name: ', 'Video Format: ', '&nbsp;&nbsp;&nbsp;Bit Rate: ', 'Video Size: ', '&nbsp;&nbsp;&nbsp;Frame Rate: ', 'Audio Format: ', '&nbsp;&nbsp;&nbsp;Sample Rate: ');
		movie_AUDIO_CHANNEL = new Array('Sound Channel: ', 'Stereo', 'Left Channel', 'Right Channel');
	}
	else {
		movie_FILE_ERROR = new Array('<br>文件格式不支持！', '<br>文件音频不支持！', '<br>文件视频不支持！', '<br>文件音频、视频不支持！', '<br>按[返回]键退出。', '<br>按[返回]键退出，按[确认]键继续。', '<br>无可用文件夹或文件！');
		movie_PAGE_NUMBER = new Array('第', '/', '页');
		movie_FILE_INFO = new Array('类型：', '大小：', '日期：', '时间：', '名称：');
		movie_BOOK_MARK = new Array('<br>书签已设置为 ', '<br>是否进入书签播放？', '无法获得当前时间！', '<br>当前时间为 ', '<br>是否设置为书签？', '<br>没有设置书签！');
		movie_OPERATE = new Array('操作无效', '当前段落: ', '当前音轨: ', '当前字幕: ', '(共', '个)　', '音轨格式: ', '　音轨语言: ', '输出制式: ', '无', '未知');
		movie_VOLUME = new Array('当前音量: ', '　静音状态: 静音', '　静音状态: 未静音');
		movie_STREAM = new Array('文件类型: ', '　文件大小: ', '当前时间: ', '　时间长度: ', '文件名称: ', '视频格式: ', '　码速率: ', '视频尺寸: ', '　帧频率: ', '音频格式: ', '　采样率: ');
		movie_AUDIO_CHANNEL = new Array('当前声道: ', '立体声', '左声道', '右声道');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: music_LanguageSelect                                    */
/* Description: 音乐界面的中英文切换                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-23                                 */
/*********************************************************************/
var music_OPERATE_INFO; //文件夹为空的信息文字数组
var music_PAGE_NUMBER; //页码文字数组
var music_FILE_INFO; //文件信息数组
var music_LIST_MESSAGE; //背景音乐列表提示文字数组
function music_LanguageSelect()
{
	if (SETUP_Language=='english') {
		music_OPERATE_INFO = new Array('<br>No folder or file is available!', '<br>Press [Back] key to exit.', 'Background Music List');
		music_PAGE_NUMBER = new Array('Page ', ' of ', '');
		music_FILE_INFO = new Array('Type: ', 'Size: ', 'Date: ', 'Time: ', 'Name: ');
		music_LIST_MESSAGE = new Array('Clear List', 'Finish', 'Delete Item', 'Finish');
	}
	else {
		music_OPERATE_INFO = new Array('<br>无可用文件夹或文件！', '<br>按[返回]键退出。', '背景音乐列表');
		music_PAGE_NUMBER = new Array('第', '/', '页');
		music_FILE_INFO = new Array('类型：', '大小：', '日期：', '时间：', '名称：');
		music_LIST_MESSAGE = new Array('清除列表', '结束更改', '删除选项', '结束更改');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: photo_LanguageSelect                                    */
/* Description: 图片界面的中英文切换                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-25                                 */
/*********************************************************************/
var photo_OPERATE_INFO; //文件夹为空的信息文字数组
var photo_PAGE_NUMBER; //页码文字数组
var photo_FILE_INFO; //文件信息数组
var photo_LIST_MESSAGE; //屏保图片列表提示文字数组
var photo_LOAD_INFO; //图片读取信息数组
var photo_MOVIE_INFO; //图片移动信息数组
var photo_CYC_TYPE; //循环方式数组
var photo_PLAY_BROWSE; //图片浏览信息数组
var photo_PLAY_SLIDE; //图片幻灯信息数组
var photo_PLAY_ROTATE; //图片旋转信息数组
var photo_PLAY_ZOOM; //图片缩放信息数组
function photo_LanguageSelect()
{
	if (SETUP_Language=='english') {
		photo_OPERATE_INFO = new Array('<br>No folder or file is available!', '<br>Press [Back] key to exit.', 'Screensaver List');
		photo_PAGE_NUMBER = new Array('Page ', ' of ', '');
		photo_FILE_INFO = new Array('Type: ', 'Size: ', 'Date: ', 'Time: ', 'Name: ');
		photo_LIST_MESSAGE = new Array('Clear List', 'Finish', 'Delete Item', 'Finish');
		photo_LOAD_INFO = new Array('Loading data, Please wait...', 'damaged file!');
		photo_CYC_TYPE = new Array('Order Play&nbsp;&nbsp;&nbsp;', 'Loop&nbsp;&nbsp;&nbsp;', 'Shuffle Play&nbsp;&nbsp;&nbsp;');
		photo_PLAY_BROWSE = new Array('Browse Mode&nbsp;&nbsp;&nbsp;', 'Preview ', ' of ', '');
		photo_PLAY_SLIDE  = new Array('Slide Show&nbsp;&nbsp;&nbsp;', 'Interval: ', 's');
		photo_PLAY_ROTATE = new Array('Rotate Mode&nbsp;&nbsp;&nbsp;', 'Angle: ', '');
		photo_PLAY_ZOOM   = new Array('Zoom Mode&nbsp;&nbsp;&nbsp;', 'Ratio: ', '%');
		photo_MOVIE_INFO = new Array('Left Shift', 'Right Shift', 'Up Shift', 'Down Shift', 'Invalid Operation');
	}
	else {
		photo_OPERATE_INFO = new Array('<br>无可用文件夹或文件！', '<br>按[返回]键退出。', '屏保图片列表');
		photo_PAGE_NUMBER = new Array('第', '/', '页');
		photo_FILE_INFO = new Array('类型：', '大小：', '日期：', '时间：', '名称：');
		photo_LIST_MESSAGE = new Array('清除列表', '结束更改', '删除选项', '结束更改');
		photo_LOAD_INFO = new Array('正在读取图片，请稍候 ...', '图片文件损坏！');
		photo_CYC_TYPE = new Array('顺序方式　', '循环方式　', '随机方式　');
		photo_PLAY_BROWSE = new Array('图片浏览　', '第', '张(共', '张)');
		photo_PLAY_SLIDE  = new Array('幻灯播放　', '间隔:', '秒');
		photo_PLAY_ROTATE = new Array('图片旋转　', '旋转角度:', '°');
		photo_PLAY_ZOOM   = new Array('图片放大　', '放大比例:', '%');
		photo_MOVIE_INFO = new Array('图片左移', '图片右移', '图片上移', '图片下移', '操作无效');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: game_LanguageSelect                                    */
/* Description: 游戏界面的中英文切换                                 */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-25                                 */
/*********************************************************************/
var game_OPERATE_INFO; //文件夹为空的信息文字数组
var game_PAGE_NUMBER; //页码文字数组
var game_FILE_INFO; //文件信息数组
var game_EXIT_INFO; //游戏推出提示文字数组
function game_LanguageSelect()
{
	if (SETUP_Language=='english') {
		game_OPERATE_INFO = new Array('<br>No folder or file is available!', '<br>Press [Back] key to exit.');
		game_PAGE_NUMBER = new Array('Page ', ' of ', '');
		game_FILE_INFO = new Array('Name: ', 'Description: ');
		game_EXIT_INFO = new Array('Exiting game, please wait...', 'Leave the game?');
	}
	else {
		game_OPERATE_INFO = new Array('<br>无可用文件夹或文件！', '<br>按[返回]键退出。');
		game_PAGE_NUMBER = new Array('第', '/', '页');
		game_FILE_INFO = new Array('游戏名称：', '游戏简介：');
		game_EXIT_INFO = new Array('正在退出游戏，请稍候...', '是否退出游戏？');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: file_LanguageSelect                                     */
/* Description: 文件管理界面的中英文切换                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-29                                 */
/*********************************************************************/
var file_OPERATE_INFO; //文件夹为空的信息文字数组
var file_PAGE_NUMBER; //页码文字数组
var file_FILE_INFO; //文件信息数组
var file_SELECT_INFO; //文件选择提示文字数组
var file_DELETE_INFO; //文件删除提示文字数组
var file_SORT_INFO; //排序方式提示文字数组
var file_FILE_OPERATE; //操作提示文字数组
var file_SCAN_INFO;		//搜索结果提示数组
function file_LanguageSelect()
{
	if (SETUP_Language=='english') {
		file_OPERATE_INFO = new Array('<br>No folder or file is available!', '<br>Press [Back] key to exit.', 'Operation', ' - Sorting order', 'Information', 'Please input Keyword!', 'Scan', 'Process', 'Volume', 'Searching...', 'Result is empty, please re-input or exit!', '<br>Can not play!<br>press any key to return.');
		file_PAGE_NUMBER = new Array('Page ', ' of ', '');
		file_FILE_INFO = new Array('Type: ', 'Size: ', 'Date: ', 'Time: ', 'Name: ', 'File ', 'Create ', 'Rotate Mode&nbsp;&nbsp;&nbsp;', 'Angle: ', '', 'Loading data, Please wait...');
		file_SELECT_INFO = new Array('Selected ', ' items, ', 'Total of ', '');
		file_DELETE_INFO = new Array('<br>Deleting ', '<br>please wait...', '<br>[Enter] to Delete, [Back] to Exit.');
		file_SORT_INFO = new Array('Sort by items name', 'Sort by items type', 'Sort by items size', 'Sort by items date');
		file_FILE_OPERATE = new Array('Select sorting order', 'Delete selected item', 'Select All / Select None', 'Select current items', 'Play');
		file_SCAN_INFO = new Array('Search &quot;', '&quot;, Total of ', '', '<br>Are you sure to exit? <br>[Enter]: to exit, [Back]: to cancel.');
	}
	else {
		file_OPERATE_INFO = new Array('<br>无可用文件夹或文件！', '<br>按[返回]键退出。', '操作提示', ' — 排序方式', '文件信息', '请输入关键字！', '搜索', '播放进度', '音量控制', '正在搜索，请稍候...', '搜索结果为空，请重新输入或退出！', '<br>该文件无法播放！<br>按任意键继续。');
		file_PAGE_NUMBER = new Array('第', '/', '页');
		file_FILE_INFO = new Array('类型：', '大小：', '日期：', '时间：', '名称：', '文件', '创建', '图片旋转　', '旋转角度:', '°', '正在读取图片，请稍候 ...');
		file_SELECT_INFO = new Array('选择了', '个项目, ', '共', '个');
		file_DELETE_INFO = new Array('<br>正在删除', '<br>请稍后...', '<br>按[确认]键删除　按[返回]键取消');
		file_SORT_INFO = new Array('按项目名称排序', '按项目类型排序', '按项目大小排序', '按创建时间排序');
		file_FILE_OPERATE = new Array('排序方式选择', '删除已选项目', '全选/取消', '选择当前项目', '播放');
		file_SCAN_INFO = new Array('搜索"', '"时，获得 ', ' 个项目！', '<br>是否放弃搜索结果？<br>按[确定]退出， 按[返回]取消！');
	}
	comm_LanguageSelect();
	return;
}

/*********************************************************************/
/* Function: file_LanguageSelect                                     */
/* Description: 文件管理界面的中英文切换                             */
/* Parameters:                                                       */
/* Author&Date: lixudong  2009-12-29                                 */
/*********************************************************************/
var set_FILE_INFO;		//设置模块名称数组
var set_SET_MOVIE_INFO;	//电影设置各选项名称数组
var set_SET_MUSIC_INFO;	//音乐设置各选项名称数组
var set_SET_PHOTO_INFO;	//相册设置各选项名称数组
var set_SET_SYSTEM_INFO;	//系统设置各选项名称数组
var set_TIPS_INFO;		//设置页面提示信息数组

var autoPlayModeValue;	//电影设置：自动连续播放取值
var subtitleSizeValue;	//电影设置：字幕大小取值
var subtitleColorValue;	//电影设置：字幕颜色取值
var subtitlePositionValue;	//电影设置：字幕位置取值
var aspectRatioValue;	//电影设置：视频大小取值

var wordShowModeValue;	//音乐设置：显示歌词取值
var isScreenSaverValue;	//音乐设置：屏保开关取值
var screenSaverTimeValue;	//音乐设置：屏保切换时间取值

var lanternModeValue;	//相册设置：循环方式取值
var lanternIntervalValue;	//相册设置：切换时间取值
var lanternChangeTypeValue;	//相册设置：切换效果取值

var webStyleValue;	//系统设置：风格切换取值
var skinIndexValue;	//系统设置：皮肤切换取值
var languageValue;	//系统设置：语言切换取值
var keyWavValue;	//系统设置：按键音取值
var systemValue;	//系统设置：电视制式取值
var set_CLEAR_SYSTEM;	//清理系统文件

function set_LanguageSelect()
{
	if (SETUP_Language=='english') {
		set_FILE_INFO = new Array('Movie Setup', 'Music Setup', 'Album Setup', 'System Setup');
		set_SET_MOVIE_INFO = new Array('Continued Play', 'Pri. Language', 'Subtitle Size', 'Subtitle Color', 'Subtitle Position', 'Aspectratio');
		set_SET_MUSIC_INFO = new Array('Play mode', 'LRC Display', 'Screen Saver', 'Opening Time', 'Time Interval', 'Special Effects');
		set_SET_PHOTO_INFO = new Array('Play Mode', 'Time Interval', 'Special Effects', 'Auto Rotation');
		set_SET_SYSTEM_INFO = new Array('Select Style', 'Select Skin', 'Select Language', 'Select Key tone', 'TV System', 'Factory Reset', 'Check Up HD');
		set_TIPS_INFO = new Array('Save', 'Reset', 'Back');
		
		autoPlayModeValue = new Array('Off', 'On');
		subtitleSizeValue = new Array('Small', 'Middle', 'Big');
		subtitleColorValue = new Array('Black', 'White', 'Blue');
		subtitlePositionValue = new Array('Bottom', 'Top');
		aspectRatioValue = new Array('4:3', '16:9', 'auto');
		
		wordShowModeValue = new Array('Off', 'On');
		isScreenSaverValue = new Array('Off', 'On');
		screenSaverTimeValue = new Array('1 min', '2 min', '3 min', '4 min', '5 min', '6 min', '7 min', '8 min', '9 min', '10 min', '11 min', '12 min', '13 min', '14 min', '15 min', '16 min', '17 min', '18 min', '19 min', '20 min', '21 min', '22 min', '23 min', '24 min', '25 min', '26 min', '27 min', '28 min', '29 min', '30 min');
		
		lanternModeValue = new Array('Order', 'Loop', 'Random', 'Repeat one');
		lanternIntervalValue = new Array('2s', '4s', '6s', '8s', '10s', '12s', '14s', '16s', '18s', '20s', '22s', '24s', '26s', '28s', '30s');
		lanternChangeTypeValue = new Array('Random', 'None', 'Top to bottom', 'Fade In-Out', 'Left to right', 'V-Blinds', 'H-Blinds', 'Bottom to top', 'Zoom Out', 'Zoom In', 'Erasure');

		webStyleValue = new Array('List', 'Phalanx');
		skinIndexValue = new Array('Skin 1', 'Skin 2');
		languageValue = new Array('Chinese', 'English');
		keyWavValue = new Array('None', 'Key tone 1', 'Key tone 2');
		systemValue = new Array('NTSC', 'PAL', '480p', '576p', '720p/50Hz', '720p/60Hz', '1080i/50Hz', '1080i/60Hz');
		set_CLEAR_SYSTEM = new Array('<br>To delete temporary files on the HD, <br>[Enter] to delete, [Back] to cancel!', '<br>Whether restore default Settings?<br>[Enter] to confirm, [Back] to cancel!');
	}
	else {
		set_FILE_INFO = new Array('电影设置', '音乐设置', '相册设置', '系统设置');
		set_SET_MOVIE_INFO = new Array('自动连续播放', '首选字幕语言', '字幕大小', '字幕颜色', '字幕位置', '宽高比例');
		set_SET_MUSIC_INFO = new Array('循环方式', '歌词显示', '屏保开关', '屏保等待时间', '屏保切换时间', '屏保切换方式');
		set_SET_PHOTO_INFO = new Array('幻灯播放方式', '幻灯切换时间', '幻灯切换效果', '自动旋转');
		set_SET_SYSTEM_INFO = new Array('界面风格', '界面皮肤', '界面语言', '按键音', '电视制式', '恢复默认设置', '清理系统文件');
		set_TIPS_INFO = new Array('保存', '重置', '返回');
		
		autoPlayModeValue = new Array('关闭', '开启');
		subtitleSizeValue = new Array('小', '中', '大');
		subtitleColorValue = new Array('黑', '白', '蓝');
		subtitlePositionValue = new Array('底部', '顶部');
		aspectRatioValue = new Array('4:3', '16:9', '自动');
		
		wordShowModeValue = new Array('关闭', '开启');
		isScreenSaverValue = new Array('关闭', '开启');
		screenSaverTimeValue = new Array('1分钟', '2分钟', '3分钟', '4分钟', '5分钟', '6分钟', '7分钟', '8分钟', '9分钟', '10分钟', '11分钟', '12分钟', '13分钟', '14分钟', '15分钟', '16分钟', '17分钟', '18分钟', '19分钟', '20分钟', '21分钟', '22分钟', '23分钟', '24分钟', '25分钟', '26分钟', '27分钟', '28分钟', '29分钟', '30分钟');
		
		lanternModeValue = new Array('顺序方式', '循环方式', '随机方式', '单曲循环');
		lanternIntervalValue = new Array('2秒', '4秒', '6秒', '8秒', '10秒', '12秒', '14秒', '16秒', '18秒', '20秒', '22秒', '24秒', '26秒', '28秒', '30秒');
		lanternChangeTypeValue = new Array('随机效果', '没有特效', '从上到下', '淡入淡出', '从左到右', '纵向百叶窗', '横向百叶窗', '从下到上', '缩小', '放大', '擦抹');

		webStyleValue = new Array('列表方式', '宫格方式');
		skinIndexValue = new Array('皮肤1', '皮肤2');
		languageValue = new Array('中文', '英文');
		keyWavValue = new Array('无声', '按键音1', '按键音2');
		systemValue = new Array('NTSC制', 'PAL制', '480p', '576p', '720p/50Hz', '720p/60Hz', '1080i/50Hz', '1080i/60Hz');
		set_CLEAR_SYSTEM = new Array('<br>该操作将会删除硬盘上的临时文件，<br>按[确认]键删除， 按[返回]键取消！', '<br>是否恢复默认设置？<br>按[确认]键确认， 按[返回]键取消！');
	}
	comm_LanguageSelect();
	return;
}

var dlna_MUSIC_INFO;	//music play tips
function dlna_LanguageSelect()
{
	if (SETUP_Language=='english') {
		dlna_MUSIC_INFO = "Music is playing!";
	} else {
		dlna_MUSIC_INFO = "正在播放音乐！";
	}
	comm_LanguageSelect();
	return;
}