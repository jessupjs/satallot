/*
Overlay
 */

class Overlay {

    // Vars
    dot_groups = {
        active: false,
        active_index: 0,
        index: 0,
        groups: [],
        coords: []
    }

    // Els
    svg = null;

    // Configs
    h = 0;
    w = 0;
    r = 3;

    // Tools
    line = d3.line();


    // Constructor
    constructor(_target) {
        this.target = _target;

        this.init();
    }

    /**
     * @function init()
     */
    init() {
        // Define this
        const vis = this;

        // Setup
        vis.svg = d3.select(`#${vis.target}`);
        vis.w = vis.svg.node().parentElement.clientWidth;
        vis.h = vis.svg.node().parentElement.clientHeight;

        // Attach events
        vis.svg.on('click', e => vis.dot_click(e));
        d3.select('body').on('keydown', e => vis.dot_keydown(e));

    }

    /**
     * @function dot_control()
     * @param {Event} e
     */
    dot_click(e) {
        // Define this
        const vis = this;

        //
        let g = null;
        if (!vis.dot_groups.active) {

            // Mark as active
            vis.dot_groups.active = true;

            // Creat els in group
            g = vis.svg.append('g');
            const path = g.append('path');
            vis.dot_groups.groups.push({
                group: g,
                path: path,
                circles: []
            });

            // Append coords
            vis.dot_groups.coords.push([]);

            // Increment
            vis.dot_groups.active_index = vis.dot_groups.index;
            vis.dot_groups.index++;
        } else {
            g = vis.dot_groups.groups[vis.dot_groups.active_index].group;
        }

        // Update coords
        vis.dot_groups.coords[vis.dot_groups.active_index].push([d3.event.layerX, d3.event.layerY]);

        // Append dot
        const circle = g.append('circle')
            .datum()
            .attr('r', vis.r)
            .attr('cx', d3.event.layerX)
            .attr('cy', d3.event.layerY)
            .attr('stroke', 'rgba(255, 255, 255, 1')
            .attr('fill', 'rgba(255, 0, 0, 0.75');

    }

    /**
     * @function dot_keydown()
     * @param {Event} e
     */
    dot_keydown(e) {
        // Define this
        const vis = this;

        // Enter key close path
        if (d3.event.key === 'Enter') {
            console.log(vis.dot_groups)
            // Change active status
            vis.dot_groups.active = false;

            // Update path
            const path = vis.dot_groups.groups[vis.dot_groups.active_index].path;
            path.attr('d', vis.line(vis.dot_groups.coords[vis.dot_groups.active_index]))
                .attr('fill', 'rgba(255, 0, 0, 0.5)');


        }

    }


}