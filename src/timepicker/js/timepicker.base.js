﻿/* global window alert jQuery gj */
/**
  * @widget TimePicker
  * @plugin Base
  */
gj.timepicker = {
    plugins: {},
    messages: {
        'en-us': {
            am: 'AM',
            pm: 'PM'
        }
    }
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- timepicker -->
         * <input id="timepicker" />
         * <script>
         *    $('#timepicker').timepicker({ width: 280 });
         * </script>
         * @example HTML.Config <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    $('#timepicker').timepicker();
         * </script>
         */
        width: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * @type String
         * @default 'MM:HH'
         * @example Sample <!-- timepicker -->
         * <input id="timepicker" value="13 - 42" />
         * <script>
         *     var timepicker = $('#timepicker').timepicker({
         *         format: 'HH.MM'
         *     });
         * </script>
         */
        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <input id="timepicker" width="270" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial timepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({
         *        value: '13:42'
         *    });
         * </script>
         * @example HTML <!-- timepicker -->
         * <input id="timepicker" width="312" value="13:42" />
         * <script>
         *     $('#timepicker').timepicker();
         * </script>
         */
        value: undefined,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'de-de'
         *    });
         * </script>
         * @example Bulgarian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'bg-bg'
         *    });
         * </script>
         * @example French <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'fr-fr'
         *    });
         * </script>
         * @example Brazil <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'pt-br'
         *    });
         * </script>
         * @example Russian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'ru-ru'
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-clock gj-clock-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        showOtherMonths: true
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'timepicker');
        this.attr('data-timepicker', 'true');
        gj.timepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($timepicker) {
        var data = $timepicker.data(), $calendar,
            $wrapper = $timepicker.parent('div[role="wrapper"]'),
            $rightIcon = data.uiLibrary !== 'materialdesign' && data.iconsLibrary === 'materialicons' ? $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>') : $(data.icons.rightIcon);

        $rightIcon.attr('role', 'right-icon');
        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $timepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $timepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $timepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        //data.fontSize && $timepicker.css('font-size', data.fontSize);

        $rightIcon.on('click', function (e) {
            var $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
            if ($clock.is(':visible')) {
                gj.timepicker.methods.hide($timepicker);
            } else {
                gj.timepicker.methods.show($timepicker);
            }
        });

        $timepicker.on('blur', function () {
            $timepicker.timeout = setTimeout(function () {
                if (!$timepicker.mouseMove) {
                    gj.timepicker.methods.hide($timepicker);
                }
            }, 500);
        });

        $wrapper.append($rightIcon);

        $calendar = gj.timepicker.methods.createClock($timepicker);

        if (data.keyboardNavigation) {
            $timepicker.on('keydown', gj.timepicker.methods.createKeyDownHandler($timepicker, $calendar));
        }
    },

    createClock: function ($timepicker) {
        var date, data = $timepicker.data(),
            $clock = $('<div role="clock" />').addClass(data.style.clock).attr('guid', $timepicker.attr('data-guid')),
            $body = $('<div role="body" />');
            $dial = $('<div role="dial"></div>');
        

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('hours', date.getHours());
        }
        
        $dial.on('mousedown', gj.timepicker.methods.mouseDownHandler($timepicker, $clock));
        $dial.on('mousemove', gj.timepicker.methods.mouseMoveHandler($timepicker, $clock));
        $dial.on('mouseup', gj.timepicker.methods.mouseUpHandler($timepicker, $clock));

        $body.append($dial);
        $clock.append($body);
        $clock.hide();

        $('body').append($clock);
        return $clock;
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case '12h': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24h': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
        }
    },

    select: function (e, $timepicker, $clock) {
        var mouseX, mouseY, $dial, $arrow, rect, value;
        $dial = $clock.find('[role="dial"]');
        $arrow = $clock.find('[role="arrow"]');
        mouseX = $timepicker.mouseX(e);
        mouseY = $timepicker.mouseY(e);

        rect = e.target.getBoundingClientRect();
        value = gj.timepicker.methods.getPointerValue(mouseX - rect.left, mouseY - rect.top, $timepicker.dialMode == 'hours' ? '24h' : 'minutes');

        if ($timepicker.dialMode == 'hours' && (value == 0 || value > 12)) {
            $arrow.css('width', 'calc(50% - 52px)');
        } else {
            $arrow.css('width', 'calc(50% - 20px)');
        }

        if ($timepicker.dialMode == 'hours') {
            $arrow.css('transform', 'rotate(' + ((value * 30) - 90).toString() + 'deg)');
        } else {
            $arrow.css('transform', 'rotate(' + ((value * 6) - 90).toString() + 'deg)');
        }
        $arrow.show();

        if ($timepicker.dialMode == 'hours') {
            $timepicker.attr('hour', value);
            setTimeout(function () {
                gj.timepicker.methods.renderMinutes($timepicker, $clock);
            }, 1000);
        } else if ($timepicker.dialMode == 'minutes') {
            $timepicker.attr('minute', value);
        }

        gj.timepicker.methods.update($timepicker);
    },

    update: function ($timepicker) {
        var data = $timepicker.data(),
            date = new Date(0, 0, 0, $timepicker.attr('hour') || 0, $timepicker.attr('minute') || 0),
            value = gj.core.formatDate(date, data.format, data.locale);

        $timepicker.val(value);
        gj.timepicker.events.change($timepicker);
    },

    mouseDownHandler: function ($timepicker, $clock) {
        return function (e) {
            $timepicker.mouseMove = true;
        }
    },

    mouseMoveHandler: function ($timepicker, $clock) {
        return function (e) {
            if ($timepicker.mouseMove) {
                gj.timepicker.methods.select(e, $timepicker, $clock);
            }
        }
    },

    mouseUpHandler: function ($timepicker, $clock) {
        return function (e) {
            gj.timepicker.methods.select(e, $timepicker, $clock);
            $timepicker.mouseMove = false;
            $timepicker.focus();
            clearTimeout($timepicker.timeout);
        }
    },

    renderHours: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]');

        clearTimeout($timepicker.timeout);
        $dial.empty();

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="c296"></div><div class="c297"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">1</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">2</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">3</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">4</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">6</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">7</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">8</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">9</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">11</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">12</span>');
        $dial.append('<span role="hour" style="transform: translate(38px, -65.8179px);">13</span>');
        $dial.append('<span role="hour" style="transform: translate(65.8179px, -38px);">14</span>');
        $dial.append('<span role="hour" style="transform: translate(76px, 0px);">15</span>');
        $dial.append('<span role="hour" style="transform: translate(65.8179px, 38px);">16</span>');
        $dial.append('<span role="hour" style="transform: translate(38px, 65.8179px);">17</span>');
        $dial.append('<span role="hour" style="transform: translate(4.65366e-15px, 76px);">18</span>');
        $dial.append('<span role="hour" style="transform: translate(-38px, 65.8179px);">19</span>');
        $dial.append('<span role="hour" style="transform: translate(-65.8179px, 38px);">20</span>');
        $dial.append('<span role="hour" style="transform: translate(-76px, 9.30732e-15px);">21</span>');
        $dial.append('<span role="hour" style="transform: translate(-65.8179px, -38px);">22</span>');
        $dial.append('<span role="hour" style="transform: translate(-38px, -65.8179px);">23</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.3961e-14px, -76px);">00</span>');

        $timepicker.dialMode = 'hours';
    },

    renderMinutes: function ($timepicker, $clock) {
        var $dial = $clock.find('[role="dial"]');

        clearTimeout($timepicker.timeout);
        $dial.empty();

        $dial.append('<div role="arrow" style="transform: rotate(-90deg); display: none;"><div class="c296"></div><div class="c297"></div></div>');

        $dial.append('<span role="hour" style="transform: translate(54px, -93.5307px);">5</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, -54px);">10</span>');
        $dial.append('<span role="hour" style="transform: translate(108px, 0px);">15</span>');
        $dial.append('<span role="hour" style="transform: translate(93.5307px, 54px);">20</span>');
        $dial.append('<span role="hour" style="transform: translate(54px, 93.5307px);">25</span>');
        $dial.append('<span role="hour" style="transform: translate(6.61309e-15px, 108px);">30</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, 93.5307px);">35</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, 54px);">40</span>');
        $dial.append('<span role="hour" style="transform: translate(-108px, 1.32262e-14px);">45</span>');
        $dial.append('<span role="hour" style="transform: translate(-93.5307px, -54px);">50</span>');
        $dial.append('<span role="hour" style="transform: translate(-54px, -93.5307px);">55</span>');
        $dial.append('<span role="hour" style="transform: translate(-1.98393e-14px, -108px);">60</span>');

        $timepicker.dialMode = 'minutes';
    },

    show: function ($timepicker) {
        var data = $timepicker.data(),
            offset = $timepicker.offset(),
            $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');

        gj.timepicker.methods.renderHours($timepicker, $clock);
        $clock.css('left', offset.left).css('top', offset.top + $timepicker.outerHeight(true) + 3);
        $clock.show();
        $timepicker.focus();
        gj.timepicker.events.show($timepicker);
    },

    hide: function ($timepicker) {
        var $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
        $clock.hide();
        gj.timepicker.events.hide($timepicker);
    },

    value: function ($timepicker, value) {
        var $clock, time, data = $timepicker.data();
        if (typeof (value) === "undefined") {
            return $timepicker.val();
        } else {
            time = gj.core.parseDate(value, data.format, data.locale);
            if (time) {
                $clock = $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]');
                gj.timepicker.methods.select($timepicker, $clock, time)();
            } else {
                $timepicker.val('');
            }
            return $timepicker;
        }
    },

    destroy: function ($timepicker) {
        var data = $timepicker.data(),
            $parent = $timepicker.parent();
        if (data) {
            $timepicker.off();
            $('body').children('[role="clock"][guid="' + $timepicker.attr('data-guid') + '"]').remove();
            $timepicker.removeData();
            $timepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-timepicker');
            $timepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $timepicker.unwrap();
        }
        return $timepicker;
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($timepicker) {
        return $timepicker.triggerHandler('change');
    },

    /**
     * Event fires when the timepicker is opened.
     * @event show
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         show: function (e) {
     *             alert('show is fired.');
     *         }
     *     });
     * </script>
     */
    show: function ($timepicker) {
        return $timepicker.triggerHandler('show');
    },

    /**
     * Event fires when the timepicker is closed.
     * @event hide
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         hide: function (e) {
     *             alert('hide is fired.');
     *         }
     *     });
     * </script>
     */
    hide: function ($timepicker) {
        return $timepicker.triggerHandler('hide');
    }
};

gj.timepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.mouseMove = false;
    self.dialMode = undefined;

    /** Gets or sets the value of the timepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- timepicker -->
     * <button class="gj-button-md" onclick="alert($timepicker.value())">Get Content</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     * @example Set <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.value('08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- timepicker -->
     * <button class="gj-button-md" onclick="timepicker.destroy()">Destroy</button>
     * <input id="timepicker" />
     * <script>
     *     var timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Show the calendar.
     * @method
     * @return timepicker
     * @example Show.Hide <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$timepicker.hide()">Hide</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.show = function () {
        gj.timepicker.methods.show(this);
    };

    /** Hide the calendar.
     * @method
     * @return timepicker
     * @example Show.Hide <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$timepicker.hide()">Hide</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.hide = function () {
        gj.timepicker.methods.hide(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-timepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.timepicker.widget.prototype = new gj.widget();
gj.timepicker.widget.constructor = gj.timepicker.widget;

(function ($) {
    $.fn.timepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.timepicker.widget(this, method);
            } else {
                $widget = new gj.timepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);