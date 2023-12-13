-- addNew
    INSERT INTO `styles` (`section_id`, `width`, `height`, `font_size`, `font_weight`, `font_family`, `line_height`, `margin_top`, `text_align`, `text_color`, `border_radius`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- changeAll
    UPDATE `styles`
    SET `width` = ?, `height` = ?, `font_size` = ?, `font_weight` = ?, `font_family` = ?, `line_height` = ?, `margin_top` = ?, `text_align` = ?, `text_color` = ?, `border_radius` = ?
    WHERE `section_id` = ?;
    