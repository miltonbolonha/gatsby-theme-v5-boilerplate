---
topology: pages
template: one-column.js
status: true
title: ROS mini-project
description: Foram MBA.
slug: ros-mini-project
featuredImage: ../posts/images/52015494369_659ac9d5bb_o.jpg
date: 2022-12-14T10:20:00+00:00
---

# ROS mini-project

## Objective

We want to make sure that you

- are comfortable with `Linux`, `ROS1` and `git`
- have basic programming skills
- know you to document code and follow style guides

## Preliminary tasks

- Do **Beginner Level** tutorials 1 to 17 of [http://wiki.ros.org/ROS/Tutorials]()
- Follow installation steps required to start the husky simulator under ROS noetic

```
$ sudo apt install ros-noetic-gazebo-ros-* ros-noetic-lms1xx
$ cd ~/catkin_ws/src
$ git clone https://github.com/husky/husky.git
$ cd ..
$ rosdep install --from-path src --ignore-src
$ catkin build
$ source devel/setup.bash
```

## Run the simulation

Start the main launch file for the husky robot using:

```
roslaunch husky_gazebo husky_empty_world.launch
```

The estimated location of the robot is provided by the Extended Kalman Filter output: it is published on `/odometry/filtered`.

```
$ rostopic echo /odometry/filtered
```

The robot velocity can be set by publishing a `Twist` message to `/twist_marker_server/cmd_vel` by:

- writing `rostopic pub /twist_marker_server/cmd_vel geometry_msgs/Twist`
- pressing `tab` twice
- setting a rate of `10` hz

You can set a forward velocity, s.a.:

```
$ rostopic pub /twist_marker_server/cmd_vel geometry_msgs/Twist "linear:
  x: 0.2
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.0" -r 10
```

## Task

Write a C++ node which makes the robot drive to the point at position `x = 10.0` and `y = 1.0` in the `odom` frame.

Your node has to

- subscribe to `/odometry/filtered`
- publish to `/twist_marker_server/cmd_vel`

The correct location is reached when the robot is within 0.5 m of the target location, e.g.

```
$ rosrun tf tf_echo odom base_link
- Translation: [10.254, 1.324, 0.000]
- Rotation: ...
```

Do **not** write something too complex: please keep it simple.

And please follow code styles described in [http://wiki.ros.org/StyleGuide](http://wiki.ros.org/StyleGuide), [http://wiki.ros.org/CppStyleGuide](http://wiki.ros.org/CppStyleGuide) and [http://wiki.ros.org/PyStyleGuide](http://wiki.ros.org/PyStyleGuide).

## Add a `README.md`

Add a `README.md` file describing:

- how to install the required dependencies
- what your node does
- how to use it

## Upload on gitlab.com

- Create a **private** repository
- Push your code (you should have have more than one commit for this mini-project)
- Add `maug` (Maurice Gohlke) and `ddimarco` (Daniel Di Marco) as collaborators

Send us the link to the repository via email at [maurice.gohlke@farming-revolution.com](mailto:maurice.gohlke@farming-revolution.com).
