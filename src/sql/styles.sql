-- Post new section styles in styles table
    INSERT INTO `styles` (`section_id`, `font_size`, `font_weight`, `font_family`, `line_height`, `margin_top`, `text_align`, `text_color`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- Patch new section styles in style table
    UPDATE `styles`
    SET `font_size` = ?, `font_weight` = ?, `font_family` = ?, `line_height` = ?, `margin_top` = ?, `text_align` = ?, `text_color` = ?
    WHERE `section_id` = ?;